import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

type Provider = {
  id: string
  fullName: string
}

type ProviderComboboxProps = {
  items: Provider[]
  value: string
  onChange: (value: string | null) => void
  placeholder?: string
  emptyMessage?: string
}

export function ProviderCombobox({
  items,
  value,
  onChange,
  placeholder = "Proveedor…",
  emptyMessage = "No se encontraron proveedores.",
}: ProviderComboboxProps) {
  return (
    <Combobox items={items} value={value} onValueChange={onChange}>
      <ComboboxInput placeholder={placeholder} />

      <ComboboxContent>
        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>

        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.id} value={item.id}>
              {item.fullName}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}