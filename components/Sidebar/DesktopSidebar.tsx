import ChannelFilter from "../Feed/ChannelFilter"
import Media from "../ui/media"

const DesktopSidebar = () => {
    return (
        <main className="w-[360px] h-screen">
            <section className="flex gap-">
                <Media
                    link="/images/V2/logo.svg"
                    blurLink="/images/V2/logo.png"
                    containerClasses="w-8 h-8 rounded-full overflow-hidden"
                />
                <p className="font-sora_semibold text-[18px]">Sonata</p>
            </section>
            <section>
                <ChannelFilter />
            </section>
        </main>
    )
}

export default DesktopSidebar