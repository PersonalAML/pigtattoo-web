import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { isLang } from "@/i18n/dictionaries";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  component: LangLayout,
});

function LangLayout() {
  const { lang } = Route.useParams();
  if (!isLang(lang)) return null;
  return (
    <SiteLayout lang={lang}>
      <Outlet />
    </SiteLayout>
  );
}
