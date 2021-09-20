import { FC } from "lib/ReactUtils";
import Head from "next/head";
import Image from "next/image";
import { Navigation } from "components/Navigation";

export const Title: FC<{ pageTitle: string | null }> = ({ pageTitle }) => {
	const title = pageTitle ? `Jared Rickert - ${pageTitle}` : "Jared Rickert";
	return (
		<>
			<title>{title}</title>
			<meta
				key="title"
				property="og:title"
				content="Jared Rickert, Web Developer from Minnesota"
			/>
		</>
	);
};

export const Description: FC<{ content: string }> = ({ content }) => (
	<>
		<meta name="description" content={content} />
		<meta key="title" name="og:description" content={content} />
	</>
);

export const ViewPort: FC = () => (
	<meta name="viewport" content="initial-scale=1.0, width=device-width" />
);

export const Favicon: FC = () => <link rel="icon" href="/favicon.ico" />;

export interface LayoutProps {
	pageTitle: string | null;
	description: string;
}
export const Layout: FC<LayoutProps> = ({ description, pageTitle, children }) => {
	return (
		<div>
			<Head>
				<Title pageTitle={pageTitle} />
				<Description content={description} />
				<Favicon />
				<ViewPort />
			</Head>
			<nav>
				<Navigation />
			</nav>
			<main>{children}</main>
			<footer>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{" "}
					<span>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	);
};

export { Head };

export default Layout;
