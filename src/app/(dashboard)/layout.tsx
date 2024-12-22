import Navbar from "@/components/Navbar";

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Navbar>
            <main className="h-full">{children}</main>
        </Navbar>
    );
}