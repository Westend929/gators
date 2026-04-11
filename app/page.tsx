import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          loop
          className="h-full"
        >
          <SwiperSlide>
            <video className="w-full h-full object-cover" autoPlay muted loop>
              <source src="/videos/safari1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-white text-4xl font-bold">Welcome to Safari Tours</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <video className="w-full h-full object-cover" autoPlay muted loop>
              <source src="/videos/safari2.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-white text-4xl font-bold">Experience Wildlife</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <video className="w-full h-full object-cover" autoPlay muted loop>
              <source src="/videos/safari3.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-white text-4xl font-bold">Adventure Awaits</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <video className="w-full h-full object-cover" autoPlay muted loop>
              <source src="/videos/safari4.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-white text-4xl font-bold">Book Your Safari</h1>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Other Sections */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center">Our Safaris</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <Image src="/images/safari1.jpg" alt="Safari 1" width={300} height={200} className="mx-auto" />
              <h3 className="text-xl font-semibold mt-4">Wildlife Safari</h3>
              <p>Experience the best wildlife in Africa.</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-4">View Itinerary</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="flex">
                    <div className="w-1/2">
                      <Image src="/images/itinerary.jpg" alt="Itinerary" width={400} height={300} />
                    </div>
                    <div className="w-1/2 pl-4">
                      <DialogHeader>
                        <DialogTitle>Wildlife Safari Itinerary</DialogTitle>
                        <DialogDescription>
                          Day 1: Arrival and transfer to lodge.<br />
                          Day 2: Game drive.<br />
                          Day 3: More adventures.<br />
                          Day 4: Departure.
                        </DialogDescription>
                      </DialogHeader>
                      <Button className="mt-4">Book Now</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            {/* More safaris */}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center">Customer Reviews</h2>
          <div className="mt-8">
            {/* Fetch and display reviews */}
            <p>Reviews will be loaded dynamically.</p>
          </div>
        </div>
      </section>

      {/* WhatsApp Bubble */}
      <a href="https://wa.me/1234567890" className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg">
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
