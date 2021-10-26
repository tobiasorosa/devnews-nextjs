import Link, { LinkProps } from 'next/link';
import { ReactElement, cloneElement } from 'react';

import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
	children: ReactElement;
	activeClassName: string;
}

export function ActiveLink({
	children,
	activeClassName,
	...otherProps
}: ActiveLinkProps) {
	const { asPath } = useRouter();

	const className = asPath === otherProps.href ? activeClassName : '';

	return (
		<Link {...otherProps}>
			{cloneElement(children, {
				className,
			})}
		</Link>
	);
}
