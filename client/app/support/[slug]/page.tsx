import {
  CustomerSupportPage,
} from '@/components/customer-auth/customer-support-page';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SupportPage({
  params,
}: Props) {
  const {
    slug,
  } = await params;

  return (
    <CustomerSupportPage
      slug={slug}
    />
  );
}