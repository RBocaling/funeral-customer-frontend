import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Building, Filter, Flower, Package, Search, Star } from "lucide-react";
import TitlePage from "../ui/title-page";

type SortOrder = "rating" | "price-low" | "price-high" | "popularity" | string;
type FilterType = "all" | "casket" | "flower" | "room";

type PropsType = {
  sortOrder: SortOrder;
  filterType: FilterType;
  setSortOrder: (value: SortOrder) => void;
  setFilterType: (value: FilterType) => void;
  setSearchTerm: (value: any) => void;
};

const ServicesFilter = ({
  sortOrder,
  setSortOrder,
  filterType,
  setFilterType,
  setSearchTerm,
}: PropsType) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <TitlePage
          label="Funeral Services"
        />
        <div className="flex items-center gap-5">
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-auto bg-background border  rounded-full shadow-sm focus:ring-2 focus:ring-primary px-4">
              <span className="flex items-center text-sm">
                <Star className="h-4 w-4 mr-2 text-amber-500" />
                <span className="hidden sm:inline font-medium">Sort: </span>
                <span className="font-medium">
                  {sortOrder === "rating" && "Top Rated"}
                  {sortOrder === "price-low" && "Price: Low to High"}
                  {sortOrder === "price-high" && "Price: High to Low"}
                  {sortOrder === "popularity" && "Most Popular"}
                </span>
              </span>
            </SelectTrigger>
            <SelectContent className="rounded-xl shadow-lg border ">
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="popularity">Most Popular</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search
              size={15}
              className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-3"
            />
            <Input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              placeholder="Search.."
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <div
          className={`flex items-center px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap transition-all
                ${
                  filterType === "all"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-background border bg-gray-700/20 text-foreground hover:bg-accent/10 shadow-md hover:shadow-lg"
                }`}
          onClick={() => setFilterType("all")}
        >
          <Filter className="h-4 w-4 mr-2" />
          All Services
        </div>
        <div
          className={`flex items-center px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap transition-all
                ${
                  filterType === "casket"
                    ? "bg-sky-600 text-white shadow-lg"
                    : "bg-background border bg-gray-700/20 text-foreground hover:bg-accent/10 shadow-md hover:shadow-lg"
                }`}
          onClick={() => setFilterType("casket")}
        >
          <Package className="h-4 w-4 mr-2" />
          Custom Caskets
        </div>
        <div
          className={`flex items-center px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap transition-all
                ${
                  filterType === "flower"
                    ? "bg-pink-600 text-white shadow-lg"
                    : "bg-background border bg-gray-700/20 text-foreground hover:bg-accent/10 shadow-md hover:shadow-lg"
                }`}
          onClick={() => setFilterType("flower")}
        >
          <Flower className="h-4 w-4 mr-2" />
          Flower Services
        </div>
        <div
          className={`flex items-center px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap transition-all
                ${
                  filterType === "room"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-background border bg-gray-700/20 text-foreground hover:bg-accent/10 shadow-md hover:shadow-lg"
                }`}
          onClick={() => setFilterType("room")}
        >
          <Building className="h-4 w-4 mr-2" />
          Memorial Rooms
        </div>
      </div>
    </div>
  );
};

export default ServicesFilter;
