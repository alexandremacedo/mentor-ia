export class QuotaExceededError extends Error {
  constructor(readonly scope: 'llm' = 'llm') {
    super('Quota exceeded');
  }
}
