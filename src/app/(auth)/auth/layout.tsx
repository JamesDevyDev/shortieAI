import '../../globals.css'

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className='w-[100vw] px-[10%] relative overflow-x-hidden bg-white chillax-font cursor-default'>
                {children}
            </body>
        </html>
    );
}
