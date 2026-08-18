package tr.gov.saglik.khsl.kys;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public final class AiAssistantClient {
    private AiAssistantClient() {}

    public interface Callback {
        void onSuccess(String answer);
        void onError(String message);
    }

    public static void ask(String endpoint, String question, String context, Callback callback) {
        new Thread(() -> {
            HttpURLConnection connection = null;
            try {
                URL url = new URL(endpoint);
                if (!"https".equalsIgnoreCase(url.getProtocol())) {
                    throw new IllegalArgumentException("AI proxy adresi HTTPS olmalıdır.");
                }

                connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("POST");
                connection.setConnectTimeout(20_000);
                connection.setReadTimeout(90_000);
                connection.setDoOutput(true);
                connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
                connection.setRequestProperty("Accept", "application/json");
                connection.setRequestProperty("Cache-Control", "no-store");

                JSONObject payload = new JSONObject();
                payload.put("question", question);
                payload.put("context", context);
                payload.put("client", "KHSL KYS Mobil");

                byte[] bytes = payload.toString().getBytes(StandardCharsets.UTF_8);
                try (OutputStream out = connection.getOutputStream()) {
                    out.write(bytes);
                }

                int code = connection.getResponseCode();
                InputStream stream = code >= 200 && code < 300
                        ? connection.getInputStream()
                        : connection.getErrorStream();
                String body = readAll(stream);
                JSONObject response = body.isEmpty() ? new JSONObject() : new JSONObject(body);

                if (code < 200 || code >= 300) {
                    String error = response.optString("detail", response.optString("error", "HTTP " + code));
                    callback.onError(error);
                    return;
                }

                String answer = response.optString("answer", "").trim();
                if (answer.isEmpty()) throw new IllegalStateException("AI proxy boş yanıt döndürdü.");
                callback.onSuccess(answer);
            } catch (Exception e) {
                callback.onError(e.getMessage() == null ? e.getClass().getSimpleName() : e.getMessage());
            } finally {
                if (connection != null) connection.disconnect();
            }
        }).start();
    }

    private static String readAll(InputStream input) throws Exception {
        if (input == null) return "";
        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(input, StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) sb.append(line).append('\n');
        }
        return sb.toString().trim();
    }
}
