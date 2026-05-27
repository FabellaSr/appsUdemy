import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Props {
  debts: string[];
}

export function BalancesCard({ debts }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Balances</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {debts.length > 0 ? (
          debts.map((debt, index) => (
            <div
              key={index}
              className="text-sm font-medium"
            >
              {debt}
            </div>
          ))
        ) : (
          <div className="text-sm">
            Todos están equilibrados
          </div>
        )}
      </CardContent>
    </Card>
  );
}