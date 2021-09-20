import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { cn, FC, TagC } from "lib/ReactUtils";

export const NavContainer: TagC<"ul"> = ({ children, ...props }) => (
	<ul {...props} className={cn(props.className, "flex", "justify-center")}>
		{children}
	</ul>
);

export const LinkItem: TagC<"a", { to: string }> = ({ to, children, ...props }) => {
	const router = useRouter();
	const active = router.pathname === to;
	console.log(router.pathname, to, active);
	return (
		<Link href={to}>
			<a className={cn(props.className, active && "bg-primary")}>{children}</a>
		</Link>
	);
};

export const NavItem: TagC<"li"> = ({ children, ...props }) => {
	return (
		<li {...props} className={cn(props.className)}>
			{children}
		</li>
	);
};

export const HomeNavItem: TagC<"li"> = ({ children, ...props }) => {
	return (
		<NavItem {...props}>
			<LinkItem to="/">{children ?? "Home"}</LinkItem>
		</NavItem>
	);
};

export const BlogNavItem: TagC<"li"> = ({ children, ...props }) => {
	return (
		<NavItem {...props}>
			<LinkItem to="/blog">{children ?? "Blog"}</LinkItem>
		</NavItem>
	);
};

export const CookbookNavItem: TagC<"li"> = ({ children, ...props }) => {
	return (
		<NavItem {...props}>
			<LinkItem to="/cookbook">{children ?? "Cookbook"}</LinkItem>
		</NavItem>
	);
};

export const AboutNavItem: TagC<"a"> = (props) => {
	return (
		<NavItem>
			<LinkItem to="/about">About</LinkItem>
		</NavItem>
	);
};

export const Navigation: FC = (props) => {
	return (
		<NavContainer>
			<HomeNavItem>Home</HomeNavItem>
			<BlogNavItem>Blog</BlogNavItem>
			<CookbookNavItem>Cookbook</CookbookNavItem>
			<AboutNavItem>About</AboutNavItem>
		</NavContainer>
	);
};
