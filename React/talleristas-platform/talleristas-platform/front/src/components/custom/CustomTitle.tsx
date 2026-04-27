import type { TitleProps } from "@/types";

export const CustomTitle = ({ title, subtitle }: TitleProps) => {
  return (
    <section className="text-center py-12">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">{title}</h1>
      <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
    </section>
  );
};
