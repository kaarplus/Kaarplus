import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { StarRating } from "@/components/shared/star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ReviewsCarousel() {
    const reviews = [
        {
            id: 1,
            name: "Mari Tamm",
            rating: 5,
            car: "BMW 520d",
            text: "Suurepärane kogemus. Auto oli täpselt selline nagu kirjeldatud, ja müüja oli väga professionaalne.",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            id: 2,
            name: "Jüri Sepp",
            rating: 4.5,
            car: "Audi A6",
            text: "Ostmine oli lihtne ja kiire. Kontrollitud ajalugu andis kindlustunde. Soovitan!",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            id: 3,
            name: "Anna Kuusk",
            rating: 5,
            car: "Tesla Model Y",
            text: "Väga rahul ostuga. Kaarplus aitas leida ideaalse elektriauto.",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        },
    ];

    return (
        <section className="py-24 bg-secondary/50">
            <div className="container px-4 md:px-6">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Mida kliendid arvavad
                    </h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Üle 1000 rahuloleva kliendi on ostnud oma uue auto Kaarplusi kaudu.
                    </p>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-5xl mx-auto"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {reviews.map((review) => (
                            <CarouselItem key={review.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                <div className="bg-card text-card-foreground p-6 rounded-xl shadow-sm border border-border h-full flex flex-col items-center text-center">
                                    <Avatar className="h-16 w-16 mb-4 ring-2 ring-primary/10">
                                        <AvatarImage src={review.avatar} alt={review.name} />
                                        <AvatarFallback>{review.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <p className="text-sm font-medium text-primary mb-1">{review.car}</p>
                                    <StarRating rating={review.rating} count={0} showCount={false} />
                                    <blockquote className="mt-4 text-muted-foreground italic">&quot;{review.text}&quot;</blockquote>
                                    <div className="mt-auto pt-4">
                                        <p className="font-semibold text-sm">{review.name}</p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    );
}
