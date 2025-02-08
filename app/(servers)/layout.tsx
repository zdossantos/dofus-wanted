import Link from 'next/link';

import { TooltipProvider } from '@/components/ui/tooltip';

export default function OverviewLayout({
										   children
									   }: {
	children: React.ReactNode;
}) {
	return (
		<TooltipProvider>
			<main className="flex min-h-screen w-full flex-col gap-2">
				<nav className="w-full border-b border-gray-700 bg-gray-900">
					<div className="px-3 py-3 lg:px-5 lg:pl-3">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								{/* Logo */}
								<Link href="/" className="flex items-center">
								  <span className="self-center text-xl font-semibold text-white">
									Dofus Wanted
								  </span>
								</Link>
							</div>

							{/* Right side items
							<div className="flex items-center gap-3">
								<User />
							</div>
							*/}
						</div>
					</div>
				</nav>

				{/* Add margin-top to content to account for fixed navbar */}
				<div>
					{children}
				</div>
			</main>
		</TooltipProvider>
	);
}