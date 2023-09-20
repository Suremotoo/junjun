import { Tabs, Tab } from "@nextui-org/react";
import NextLink from "next/link";
import { siteConfig } from "@/config/site";
import {
  ApiIcon,
  BxHomeSmileIcon,
  FieldStringIcon,
  HelpIcon,
  MicrosoftExcelIcon,
  ProjectIcon,
  UserSecretIcon,
} from "./icons";
import { usePathname } from "next/navigation";

export default function TabNavbar() {
  const iconMap = {
    home: <BxHomeSmileIcon />,
    user: <UserSecretIcon />,
    demo: <UserSecretIcon />,
    project: <ProjectIcon />,
    api: <ApiIcon />,
    paramter: <FieldStringIcon />,
    preview: <MicrosoftExcelIcon />,
    docs: <HelpIcon />,
  };
  const pathname = usePathname();
  console.log("pathname", pathname);

  const getIconByLinkName = (linkName: string) => {
    return iconMap[linkName] || null;
  };

  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          color="primary"
          size="lg"
          variant="bordered"
          selectedKey={pathname}
          onSelectionChange={(selected) => {
            console.log(selected);
          }}
        >
          {siteConfig.navItems.map((item) =>
            item.disabled ? null : (
              <Tab
                key={item.href}
                title={
                  <NextLink href={item.href}>
                    <div className="flex items-center space-x-2">
                      {getIconByLinkName(item.label.toLowerCase())}
                      <span> {item.label}</span>
                    </div>
                  </NextLink>
                }
              />
            )
          )}
        </Tabs>
      </div>
    </>
  );
}
