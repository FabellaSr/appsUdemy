import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useSharedFundBreakdown } from './hooks/useSharedFundBreakdown';

import {
  SharedFundBreakdownTable,
} from './components/SharedFundBreakdownTable';

export default function SharedFundsPage() {
  const now = new Date();

  const year = now.getFullYear();

  const month = now.getMonth() + 1;

  const {data, isLoading, error, } = useSharedFundBreakdown( year, month, );

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error || !data) {
    return (
      <div>
        No hay fondo cargado
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Fondo compartido
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>
            Mayo 2026
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-3xl font-bold">
            $
            {data.targetAmount.toLocaleString()}
          </div>

          <SharedFundBreakdownTable
            data={data}
          />
        </CardContent>
      </Card>
    </div>
  );
}