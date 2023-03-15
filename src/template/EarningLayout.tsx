import DashboardLayout from "../template/DashboardLayout";

import { ArrowBack } from "@/src/components/atoms/vectors";
import { Button } from "@/src/components/atoms";
import { Footer } from "../components/organisms";
import { ReactNode } from "react";
import Router from "next/router";

const EarningLayout = ({
  children,
  title,
  cta,
  isLoading,
}: {
  children: ReactNode;
  title?: string;
  isLoading?: boolean;
  cta?: {
    label: string;
    to?: string;
    onClick?: () => void;
  };
}) => {
  // const { push } = useRouter();
  // const handleNavigateTo = () => {
  //   if (cta?.to !== undefined) {
  //     push(cta?.to as string);
  //   }
  //   cta?.onClick;
  // };
  return (
    <DashboardLayout isLoading={isLoading}>
      <div className="earnings-actions">
        <div className="earnings-title-btn">
          <ArrowBack onClick={() => Router.back()} />
          <h1>{title as string}</h1>
        </div>
        {cta && <Button title={cta.label} onClick={cta.onClick} />}
      </div>
      <div className="earnings-children">{children}</div>
    </DashboardLayout>
  );
};

export default EarningLayout;
