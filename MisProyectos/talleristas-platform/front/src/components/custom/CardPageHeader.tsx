import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { CustomCenterCard } from "./CustomCenterCard"

type CardPageHeaderProps = {
  title: string
  description: string
  children: React.ReactNode
  maxWidth?: string
}

export function CardPageHeader({
  title,
  description,
  children, 
}: CardPageHeaderProps) {
  return (
    <CustomCenterCard>
        <Card className="w-full border border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-xl text-slate-900">
              {title}
            </CardTitle>

            <CardDescription className="text-slate-500">
              {description}
            </CardDescription>
          </CardHeader>

          {children}
        </Card>
      </CustomCenterCard>
  )
}