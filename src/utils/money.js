export function formatMoney(amountCents) {
  if (amountCents < 0) {
    let positiveAmount = amountCents * -1;
    return `-$${(positiveAmount / 100).toFixed(2)}`;
  }
  return `$${(amountCents / 100).toFixed(2)}`;
}
