import DashboardLayout from "../template/DashboardLayout";

import { ArrowBack } from "@/src/components/atoms/vectors";
import { Button, Heading } from "@/src/components/atoms";
import { Footer2 } from "../components/organisms";
import { ReactNode } from "react";
import Router, { useRouter } from "next/router";

const EarningLayout = ({
  children,
  title,
  cta,
}: {
  children: ReactNode;
  title: string;
  cta?: {
    label: string;
    to: string;
  };
}) => {
  const { push } = useRouter();
  const handleNavigateTo = () => {
    push(cta?.to as string);
  };
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper">
        <div className="center">
          <div className="earnings-actions">
            <div className="earnings-title-btn">
              <ArrowBack onClick={() => Router.back()} />
              <h1>{title}</h1>
            </div>
            {cta && <Button title={cta.label} onClick={handleNavigateTo} />}
          </div>
          <div className="earnings-children">{children}</div>
        </div>
        <Footer2 />
      </div>
    </DashboardLayout>
  );
};

export default EarningLayout;
