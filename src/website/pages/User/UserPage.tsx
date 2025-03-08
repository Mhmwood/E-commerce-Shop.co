const UserPage = () => {
  return (
    <div className="py-10 md:py-20 px-4 md:px-20 mt-10">
      <div className="rounded-2xl border flex  flex-col md:flex-row  flex-wrap p-5 md:p-8 ">
        <div className=" w-full md:flex  border-b pb-4 ">
          <div className="p-4  flex flex-col w-1/4">
            <figure className=" ">
              {/* <img src="" alt="" /> */}
              <div className="bg-gray-400 size-20 rounded-full"></div>
            </figure>
            <div>
              <h5 className="text-lg font-bold whitespace-nowrap">Your Name</h5>
              <p className="text-lg font-semibold text-gray-400">3822JF</p>
            </div>
          </div>

          <figure className="rounded-[1.25rem] w-full">
            {/* <img src="" alt="" /> */}

            <div className="bg-gray-400  w-full h-60 rounded-2xl "></div>
          </figure>
        </div>

        <div className="w-full md:flex justify-between *:w-full  md:*:w-1/3 p-4">
          <div className="p-4 md:even:border-l-2 border-0">
            <h5 className="text-lg font-semibold  uppercasewhitespace-nowrap">
              email
            </h5>
            <p className="text-lg text-gray-400">exmple@email.com</p>
          </div>
          <div className="p-4 md:even:border-l-2 border-0 ">
            <h5 className="text-lg font-semibold uppercase whitespace-nowrap ">
              address
            </h5>
            <p className="text-lg  text-gray-400">Your address</p>
          </div>
          <div className="p-4 md:even:border-l-2 border-0 ">
            <h5 className="text-lg font-semibold uppercase whitespace-nowrap">
              location
            </h5>
            <p className="text-lg text-gray-400">Your location</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
