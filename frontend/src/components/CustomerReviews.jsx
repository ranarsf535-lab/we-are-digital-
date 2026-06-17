import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "../api";
import { ReviewSkeleton } from "./Skeleton";

function CustomerReviews() {
  const { data: reviews, isLoading: loading, error } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => fetchJSON("/api/reviews/"),
  });

  return (
    <div className="relative py-24 px-6 bg-gray-950 text-white overflow-hidden" data-aos="fade-up">

      <div className="absolute w-[400px] h-[400px] bg-purple-600/10 blur-3xl rounded-full bottom-20 left-1/2 -translate-x-1/2"></div>

      <div className="relative max-w-6xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-bold">
          What Our Clients Say
        </h2>

        <p className="text-gray-400 mt-4">
          Real feedback from our happy customers
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">

          {loading && (
            <>
              <ReviewSkeleton />
              <ReviewSkeleton />
              <ReviewSkeleton />
            </>
          )}

          {error && (
            <p className="col-span-full text-red-400 text-center py-12">{error.message}</p>
          )}

          {!loading && !error && reviews.map((item, i) => (
            <div
              key={item.id}
              data-aos={i % 2 === 0 ? "fade-left" : "fade-right"}
              data-aos-delay={i * 150}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-left shadow-lg hover:shadow-purple-600/40 hover:-translate-y-2 transition duration-300"
            >
              {/* Stars */}
              <div className="text-yellow-400 text-sm mb-3">
                ★★★★★
              </div>

              {/* Text */}
              <p className="text-gray-300 text-sm leading-relaxed">
                "{item.text}"
              </p>

              {/* User */}
              <div className="flex items-center gap-3 mt-6">

                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    {item.name.charAt(0)}
                  </div>
                )}

                <div>
                  <h4 className="text-white font-semibold text-sm">
                    {item.name}
                  </h4>
                  <p className="text-gray-400 text-xs">
                    {item.role}
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default CustomerReviews;
