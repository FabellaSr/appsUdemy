import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    title: string;
    icon: React.ReactNode;
    description?: string;
    paragraph?: string;
}

export const HeroStatCard = ({ title, icon, description, paragraph, children }: Props) => {
    return (

        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                {description && <div className="text-lg font-bold">{description}</div>}
                {paragraph && <p className="text-xs text-muted-foreground">{paragraph}</p>}
                <div className="flex gap-1 mt-2">{children}</div>
            </CardContent>
        </Card>
    )
}
