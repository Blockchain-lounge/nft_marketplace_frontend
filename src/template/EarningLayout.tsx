import DashboardLayout from "../template/DashboardLayout";

import { ArrowBack } from "@/src/components/atoms/vectors";
import { Button, Heading } from "@/src/components/atoms";
import { Footer2 } from "../components/organisms";
import { Dispatch, ReactNode, SetStateAction } from "react";
import Router, { useRouter } from "next/router";

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
      <div className="sub-layout-wrapper">
        <div className="center">
          <div className="earnings-actions">
            <div className="earnings-title-btn">
              <ArrowBack onClick={() => Router.back()} />
              <h1>{title as string}</h1>
            </div>
            {cta && <Button title={cta.label} onClick={cta.onClick} />}
          </div>
          <div className="earnings-children">{children}</div>
        </div>
        <Footer2 />
      </div>
    </DashboardLayout>
  );
};

export default EarningLayout;
