"use client";
import { Case } from "@/types/case";
import { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";

import { AddCaseModal, SingleCase, SkeletonLoader } from ".";

const Cases = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [allCases, setAllCases] = useState<Case[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [filteredCases, setFilteredCases] = useState<Case[] | null>(null);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (allCases) {
      const temp: Case[] = allCases?.filter((data) =>
        data.fir_no.includes(e.target.value)
      );
      setFilteredCases(temp);
    }
  };

  const handleDeleteAfter = (id: string) => {
    if (allCases) {
      const temp: Case[] = allCases?.filter((data) => data._id !== id);
      setAllCases(temp);
      setFilteredCases(temp);
    }
  };
  const handleAddAfter = (data: Case) => {
    if (allCases) {
      const temp: Case[] = [...allCases, data];
      setAllCases(temp);
      setFilteredCases(temp);
    }
  };

  useEffect(() => {
    const fetchAllCases = async () => {
      try {
        const res = await fetch("api/case");
        const data = await res.json();
        setAllCases(data);
        setFilteredCases(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCases();
  }, []);

  return (
    <main className="mt-8 h-full">
      <section className="flex items-center justify-between">
        <div className="flex">
          <div className="border border-gray-300 rounded-l-full  focus-within:border-primary px-2 py-2 flex items-center gap-2 flex-[0.8]">
            <span>
              <AiOutlineSearch />
            </span>
            <input
              onChange={handleSearch}
              value={search}
              type="text"
              placeholder="Search by FIR"
              className=" outline-none w-full"
            />
          </div>
          <div className="bg-primary text-white flex-[0.2] w-[6rem] rounded-r-full flex items-center justify-center hover:bg-primaryDark transition-colors cursor-pointer">
            <AiOutlineSearch />
          </div>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="rounded-full bg-primary hover:bg-primaryDark transition-colors text-white flex items-center gap-1 px-3 py-2"
        >
          <AiOutlinePlus />
          Add New Case
        </button>
      </section>
      <section className="mt-8 flex flex-col overflow-y-auto h-[70%] mb-[5rem]">
        <div className="bg-[#f5f4fa] py-3 px-6 grid grid-cols-12">
          <div className="text-sm font-semibold text-gray-500 col-span-1">
            Sr No.
          </div>
          <div className="text-sm font-semibold text-gray-500 col-span-3">
            Case Type
          </div>
          <div className="text-sm font-semibold text-gray-500 col-span-2">
            FIR No.
          </div>
          <div className="text-sm font-semibold text-gray-500 col-span-1">
            Evidence
          </div>
          <div className="text-sm font-semibold text-gray-500 col-span-2">
            Date
          </div>
          <div className="text-sm font-semibold text-gray-500 col-span-1">
            Status
          </div>
          <div className="text-sm font-semibold text-gray-500 col-span-1">
            Priority Score
          </div>
          <div className="text-sm font-semibold text-gray-500 col-span-1"></div>
        </div>
        {filteredCases &&
          filteredCases.map((data, idx) => (
            <SingleCase
              handleDeleteAfter={handleDeleteAfter}
              key={data._id}
              data={data}
              sr_no={idx + 1}
            />
          ))}

        {loading && <SkeletonLoader />}
      </section>
      <AddCaseModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        type="add"
        handleAddAfter={handleAddAfter}
      />
    </main>
  );
};

export default Cases;
