import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function DefaultLayout({ children }) {
  return (
    <div
      className="bg-background-content text-foreground font-sans antialiased min-h-screen"
      suppressHydrationWarning={true}
    >
      <Header />

      <main className="flex flex-col min-h-[calc(100vh-70px)] max-w-screen-xl mx-auto px-3 md:px-4 lg:px-6">
        <div className="flex flex-col flex-auto py-3 md:py-6">{children}</div>
        <Footer />
      </main>
    </div>
  );
}
