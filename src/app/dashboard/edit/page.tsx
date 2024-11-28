import Image from "next/image";
import calendar from "@/assets/Calendar-cuate.svg";
import Bloby from "@/components/ui/bloby";
import EditForm from "@/components/EditForm";

const page = async ({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) => {
  const id = searchParams.id;
  return (
    <div className="flex flex-wrap gap-2 justify-around mt-8 relative flex-1 w-full max-w-6xl mx-auto items-center">
      <EditForm bdayid={id} />

      <div className="duration-500 transition-all w-48 h-52 rounded-full bg-purple-900 top-0 -translate-x-20 hover:top-4 hover:-translate-x-5 blur-3xl absolute" />
      <Bloby className="w-48 h-52 hover:-translate-x-10 bottom-0 left-0 hover:bottom-4" />
      <Image
        src={calendar}
        alt="calendar"
        width={450}
        className="drop-shadow-xl dark:opacity-85 pt-8 hover:scale-105 transition-all duration-300"
      />
    </div>
  );
};

export default page;