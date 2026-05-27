// pages/dashboard/utils/calculateDebts.ts

export function calculateDebts(report: any) {
  const balances = report.byMember.map((member: any) => ({
    userName: member.userName,
    balance:
      member.total -
      report.totalAmount / report.byMember.length,
  }));

  const creditors = balances
    .filter((b: any) => b.balance > 0)
    .sort((a: any, b: any) => b.balance - a.balance);

  const debtors = balances
    .filter((b: any) => b.balance < 0)
    .sort((a: any, b: any) => a.balance - b.balance);

  const debts: string[] = [];

  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const amount = Math.min(
      Math.abs(debtor.balance),
      creditor.balance
    );

    debts.push(
      `${debtor.userName} le debe $${Math.round(amount).toLocaleString()} a ${creditor.userName}`
    );

    debtor.balance += amount;
    creditor.balance -= amount;

    if (Math.abs(debtor.balance) < 1) i++;
    if (Math.abs(creditor.balance) < 1) j++;
  }

  return debts;
}