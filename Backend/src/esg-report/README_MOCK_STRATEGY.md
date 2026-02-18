## Strategy Generation Mock (no LLM required)

Endpoints:
- `POST /esg-reports/:id/strategies` – generates three mock variants from stored report data (no request body) and saves:
  - `strategyShort` (2–4 sentences)
  - `strategyNeutral` (5–8 sentences)
  - `strategyDetailed` (structured)
  - resets `selectedVariant` to `null`

- `PUT /esg-reports/:id/selection` – set the chosen variant (`short | neutral | detailed`); persists selection for refresh.

Mock behavior:
- Uses the report as the source of truth; writes three deterministic, number-referencing strings back to the record.
- No external API calls; stable for tests.

Future real LLM hook:
- Swap the logic in `generateStrategy` (service) to call OpenAI/Gemini; keep the same DB fields and endpoints.

Quick test sequence:
1) Create a report: `POST /esg-reports { ... }`
2) Generate: `POST /esg-reports/<id>/strategies`
3) Select: `PUT /esg-reports/<id>/selection { "variant": "neutral" }`
