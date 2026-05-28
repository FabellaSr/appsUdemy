import { SharedFundBreakdown } from "..";



interface Props {
  data: SharedFundBreakdown;
}

export function SharedFundBreakdownTable({
  data,
}: Props) {
  return (
    <div className="rounded-lg border">
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="p-3 text-left">
              Miembro
            </th>

            <th className="p-3 text-right">
              Salario
            </th>

            <th className="p-3 text-right">
              %
            </th>

            <th className="p-3 text-right">
              Debe aportar
            </th>
          </tr>
        </thead>

        <tbody>
          {data.members.map((m) => (
            <tr
              key={m.userId}
              className="border-b"
            >
              <td className="p-3">
                {m.userName}
              </td>

              <td className="p-3 text-right">
                $
                {m.salary.toLocaleString()}
              </td>

              <td className="p-3 text-right">
                {m.percentage.toFixed(2)}%
              </td>

              <td className="p-3 text-right font-semibold">
                $
                {m.expectedContribution.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}