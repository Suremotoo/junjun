import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import CardMenuPage from "@/components/cardMenu";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Effortlessly&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>generate&nbsp;</h1>
          <br />
          <h1 className={title()}>
            test cases for your APIs – the power to ensure seamless performance.
          </h1>
          <h2 className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and Easy.
          </h2>
        </div>

        <div className="flex gap-3">
          <Link
            as={NextLink}
            href={siteConfig.links.docs}
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
          >
            Documentation
          </Link>
          {/* <Link
					isExternal
					as={NextLink}
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link> */}
        </div>

        {/* <div className="mt-8">
        <Snippet hideSymbol hideCopyButton variant="flat">
          <span>
            Get started by editing 
            <Code color="primary">cd {userHomeDirectory}</Code>
          </span>
        </Snippet>
        <Snippet hideSymbol hideCopyButton variant="flat">
          <span className="whitespace-break-spaces">
            <Code color="primary" className="whitespace-break-spaces">
              {configCode}
            </Code>
          </span>
        </Snippet>
      </div> */}
      </section>
      <CardMenuPage />
    </>
  );
}
