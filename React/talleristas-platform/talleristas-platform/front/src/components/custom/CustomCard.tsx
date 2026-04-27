import {
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

type CustomCardProps = {
  title: string
  desc: string
}

export function CustomCard({ title, desc }: CustomCardProps) {
  return (
    <>
      <ItemMedia variant="image" />

      <ItemContent>
        <ItemTitle className="line-clamp-1">
          {title}
        </ItemTitle>

        <p className="text-sm text-slate-500">
          {desc}
        </p>
      </ItemContent>
    </>
  )
}