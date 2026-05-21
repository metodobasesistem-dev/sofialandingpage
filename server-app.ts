import express from "express";
import path from "path";
import fs from "fs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fallback values provided by the client
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "162518770963-0n78n6ma158ni8687tqjej8v18ehavdt.apps.googleusercontent.com";
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "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";
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || "1nJPuo3pd2_TGItgmT27rTPsd7xJ4cb5s65SqyBFi9ec";

const TOKEN_FILE = path.join(process.cwd(), "google-token.json");

// Local token storage helper
function saveRefreshToken(token: string) {
  try {
    fs.writeFileSync(TOKEN_FILE, JSON.stringify({ refresh_token: token, updatedAt: new Date().toISOString() }), "utf-8");
  } catch (err) {
    console.error("Erro ao salvar token de atualização:", err);
  }
}

function getRefreshToken(): string | null {
  if (process.env.GOOGLE_REFRESH_TOKEN) {
    return process.env.GOOGLE_REFRESH_TOKEN;
  }
  try {
    if (fs.existsSync(TOKEN_FILE)) {
      const data = JSON.parse(fs.readFileSync(TOKEN_FILE, "utf-8"));
      return data.refresh_token || null;
    }
  } catch (err) {
    // File doesn't exist yet, which is expected before authentication
  }
  return null;
}

// Exchange refresh_token for a fresh access_token
async function getAccessTokenFromRefreshToken(refreshToken: string): Promise<string> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token"
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erro ao renovar token de acesso: ${response.status} - ${errText}`);
  }

  const data: any = await response.json();
  return data.access_token;
}

// Append rows directly to the spreadsheet
async function appendLeadToSheet(lead: { name: string; clinic: string; specialty: string; phone: string }) {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("Integração com Google Sheets não autorizada pelo administrador. Acesse /api/admin/auth para autorizar.");
  }

  const accessToken = await getAccessTokenFromRefreshToken(refreshToken);

  const values = [
    [
      lead.name,
      lead.clinic,
      lead.specialty,
      lead.phone
    ]
  ];

  // Append values to 'A:D'
  const range = "A:D";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ values })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erro na API Google Sheets: ${response.status} - ${errText}`);
  }

  return await response.json();
}

// --- API Routes ---

// Healthcheck endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    sheetsConfigured: !!getRefreshToken(),
    spreadsheetId: SPREADSHEET_ID 
  });
});

// Endpoint to send the form lead to Google Sheets
app.post("/api/leads", async (req, res) => {
  const { name, clinic, specialty, phone } = req.body;

  if (!name || !clinic || !phone) {
    res.status(400).json({ error: "Parâmetros obrigatórios ausentes (nome, clinica, telefone)" });
    return;
  }

  try {
    const result = await appendLeadToSheet({ name, clinic, specialty: specialty || "", phone });
    res.json({ success: true, result });
  } catch (error: any) {
    console.error("Erro ao registrar lead na planilha:", error);
    res.status(500).json({ 
      error: "Erro interno ao registrar lead na planilha", 
      message: error.message 
    });
  }
});

// Admin OAuth Integration Route
app.get("/api/admin/auth", (req, res) => {
  const redirectUri = `${process.env.APP_URL || "http://localhost:3000"}/api/admin/callback`;
  
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/spreadsheets",
    access_type: "offline",
    prompt: "consent"
  });

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  res.redirect(googleAuthUrl);
});

// Admin Google OAuth Callback Route
app.get("/api/admin/callback", async (req, res) => {
  const { code, error } = req.query;

  if (error) {
    res.status(400).send(`
      <html>
        <head>
          <title>Erro de Integração - Sofia Med</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-[#0b0f17] text-white flex items-center justify-center min-h-screen font-sans p-6">
          <div class="max-w-md w-full bg-[#111827]/80 border border-red-500/20 rounded-3xl p-8 text-center shadow-lg">
            <div class="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h1 class="text-2xl font-bold mb-2">Erro de Autorização</h1>
            <p class="text-sm text-gray-400 mb-6">A autorização da planilha falhou ou foi rejeitada.</p>
            <div class="bg-red-500/10 text-red-400 text-xs py-3 px-4 rounded-xl border border-red-500/20 text-left mb-6 break-words font-mono">
              ${error}
            </div>
            <a href="/demonstracao" class="inline-block w-full py-4 bg-brand-cyan text-black font-bold rounded-xl hover:brightness-110 transition-all">
              Voltar ao site
            </a>
          </div>
        </body>
      </html>
    `);
    return;
  }

  if (!code) {
    res.status(400).send("Código de autorização não fornecido pela callback.");
    return;
  }

  try {
    const redirectUri = `${process.env.APP_URL || "http://localhost:3000"}/api/admin/callback`;

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        code: code as string,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Falha ao obter tokens: ${response.status} - ${errorText}`);
    }

    const data: any = await response.json();
    const tokenToSave = data.refresh_token;

    if (tokenToSave) {
      saveRefreshToken(tokenToSave);
    } else {
      // Fallback checks
      const existingToken = getRefreshToken();
      if (!existingToken) {
        throw new Error("Não recebemos o refresh_token do Google. Por favor, remova o acesso do aplicativo em sua Conta Google (Segurança) e tente novamente para forçar o consentimento.");
      }
    }

    const activeToken = tokenToSave || getRefreshToken() || "";

    res.send(`
      <html>
        <head>
          <title>Integração Ativada - Sofia Med</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @keyframes pulseSlow {
              0%, 100% { opacity: 0.2; transform: scale(1); }
              50% { opacity: 0.4; transform: scale(1.1); }
            }
          </style>
        </head>
        <body class="bg-[#080d14] text-white flex items-center justify-center min-h-screen font-sans p-4 relative overflow-hidden">
          <div class="absolute w-[500px] h-[500px] bg-[#00f2fe]/5 rounded-full blur-[120px] -top-20 -left-20 pointer-events-none" style="animation: pulseSlow 8s infinite ease-in-out;"></div>
          <div class="absolute w-[500px] h-[500px] bg-[#9b51e0]/5 rounded-full blur-[120px] -bottom-20 -right-20 pointer-events-none" style="animation: pulseSlow 8s infinite ease-in-out 4s;"></div>

          <div class="max-w-md w-full bg-[#0d1522]/80 border border-[#00f2fe]/30 rounded-[2.5rem] p-8 text-center relative z-10 shadow-2xl backdrop-blur-md">
            <div class="w-16 h-16 bg-[#00f2fe]/10 text-[#00f2fe] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#00f2fe]/20 relative">
              <div class="absolute inset-0 rounded-full border border-[#00f2fe]/40 animate-ping opacity-25"></div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>

            <h1 class="text-2xl font-black mb-2 tracking-tight bg-gradient-to-r from-[#00f2fe] to-[#4facfe] bg-clip-text text-transparent">Conexão Ativada!</h1>
            <p class="text-xs text-[#8fa2be] mb-6 leading-relaxed px-2">A planilha do Google Sheets foi conectada com sucesso ao site do <strong>Sofia Med</strong>.</p>
            
            <div class="bg-[#131d2f]/90 border border-[#00f2fe]/10 rounded-2xl p-5 text-left mb-6 space-y-3">
              <div class="flex justify-between items-center text-xs">
                <span class="text-gray-400">ID Planilha:</span>
                <span class="font-mono text-[#00f2fe] truncate max-w-[170px]">${SPREADSHEET_ID}</span>
              </div>
              <div class="flex justify-between items-center text-xs">
                <span class="text-gray-400">Status da API:</span>
                <span class="text-green-500 font-bold">&#9679; Pronta</span>
              </div>
            </div>

            ${activeToken ? `
              <div class="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5 text-left mb-6">
                <h4 class="text-xs font-bold text-yellow-400 mb-2 uppercase tracking-wide">⚠️ Atenção: Servidor Serverless (Zyreo / Vercel)</h4>
                <p class="text-[11px] text-gray-300 leading-relaxed mb-3">
                  Como este aplicativo está hospedado em ambiente serverless com sistema de arquivos temporário, salve a chave abaixo nas variáveis de ambiente na plataforma Zyreo para não perder a autenticação:
                </p>
                <div class="bg-black/40 rounded-lg p-3 border border-white/5 flex items-center justify-between gap-2 overflow-x-auto">
                  <code class="font-mono text-[10px] text-[#00f2fe] break-all select-all">GOOGLE_REFRESH_TOKEN=${activeToken}</code>
                </div>
              </div>
            ` : ''}

            <button onclick="window.close()" class="w-full py-3.5 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-slate-900 font-extrabold rounded-xl hover:brightness-110 transition-all text-xs uppercase tracking-wider shadow-lg shadow-[#00f2fe]/20">
              Fechar Janela
            </button>
          </div>
        </body>
      </html>
    `);
  } catch (err: any) {
    console.error("Erro no callback OAuth do Google:", err);
    res.status(500).send(`
      <html>
        <head>
          <title>Erro de Conexão - Sofia Med</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-[#0b0f17] text-white flex items-center justify-center min-h-screen font-sans p-6">
          <div class="max-w-md w-full bg-[#111827]/80 border border-red-500/20 rounded-3xl p-8 text-center shadow-lg">
            <div class="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h1 class="text-2xl font-bold mb-2">Erro de Processamento</h1>
            <p class="text-sm text-gray-400 mb-6">Infelizmente, ocorreu um erro ao registrar as credenciais da planilha.</p>
            <div class="bg-red-500/10 text-red-400 text-xs py-3 px-4 rounded-xl border border-red-500/20 text-left mb-6 break-words font-mono">
              ${err.message}
            </div>
            <a href="/demonstracao" class="inline-block w-full py-4 bg-brand-cyan text-black font-bold rounded-xl hover:brightness-110 transition-all">
              Voltar e tentar novamente
            </a>
          </div>
        </body>
      </html>
    `);
  }
});

export default app;
