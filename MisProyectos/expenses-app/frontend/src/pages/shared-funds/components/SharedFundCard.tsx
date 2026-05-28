import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSharedFundBreakdown } from '../hooks/useSharedFundBreakdown';
import { SalaryBreakdownItem } from '@/interfaces';

interface Props {
  year: number;
  month: number;
}

// Barra de progreso proporcional al porcentaje de cada miembro
function ContributionBar({ item, max }: { item: SalaryBreakdownItem; max: number }) {
  const widthPct = (item.contribution / max) * 100;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{item.name}</span>
        <div className="flex items-center gap-3 text-muted-foreground">
          <span>{item.percentage.toFixed(1)}%</span>
          <span className="font-semibold text-foreground">
            ${item.contribution.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
          </span>
        </div>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${widthPct}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Salario: ${item.salary.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
      </p>
    </div>
  );
}

export function SharedFundCard({ year, month }: Props) {
  const { data, isLoading, isError } = useSharedFundBreakdown( year, month );

  const maxContribution = data
    ? Math.max(...data.breakdown.map((b: { contribution: any; }) => b.contribution))
    : 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aporte al fondo compartido</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading && (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-1 animate-pulse">
                <div className="h-4 w-1/2 rounded bg-muted" />
                <div className="h-2 w-full rounded bg-muted" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <p className="text-sm text-muted-foreground">
            No hay fondo o salarios cargados para este mes.
          </p>
        )}

        {data && (
          <div className="space-y-4">
            {/* Totales del mes */}
            <div className="flex items-center justify-between rounded-lg bg-secondary px-4 py-3">
              <div className="text-sm text-muted-foreground">Monto a dividir</div>
              <div className="text-lg font-bold">
                ${data.targetAmount.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
              </div>
            </div>

            {/* Barra por miembro */}
            <div className="space-y-4">
              {data.breakdown.map((item: SalaryBreakdownItem) => (
                <ContributionBar
                  key={item.userId}
                  item={item}
                  max={maxContribution}
                />
              ))}
            </div>

            {/* Footer: suma de salarios */}
            <p className="text-xs text-muted-foreground text-right border-t pt-2">
              Ingresos combinados: ${data.totalSalaries.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
