import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

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
  maxWidth = "max-w-4xl",
}: CardPageHeaderProps) {
  return (
    <section className="flex min-h-[calc(100vh-80px)] w-full items-start justify-center bg-slate-50 px-4 py-8">
      <div className={`w-full ${maxWidth}`}>
        <Card className="w-full border border-slate-200 bg-white shadow-sm">
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
      </div>
    </section>
  )
}