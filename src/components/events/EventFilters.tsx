
import { useState } from "react";
import { Search, Calendar, MapPin, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EVENT_CATEGORIES } from "@/constants";

interface EventFiltersProps {
  onFilter: (filters: any) => void;
}

export function EventFilters({ onFilter }: EventFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    date: "",
    location: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      date: "",
      location: "",
    });
    onFilter({
      search: "",
      category: "",
      date: "",
      location: "",
    });
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              name="search"
              value={filters.search}
              onChange={handleInputChange}
              placeholder="Rechercher un événement..."
              className="pl-10"
            />
          </div>

          {/* Category dropdown */}
          <div className="w-full md:w-48">
            <select 
              name="category"
              value={filters.category}
              onChange={handleInputChange}
              className="w-full h-10 pl-3 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-eticket-400"
            >
              <option value="">Toutes catégories</option>
              {EVENT_CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Toggle Filters button */}
          <Button 
            type="button"
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal size={16} />
            Filtres
          </Button>

          {/* Search Button */}
          <Button type="submit">
            Rechercher
          </Button>
        </div>

        {/* Advanced filters */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            {/* Date filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                name="date"
                value={filters.date}
                onChange={handleInputChange}
                className="w-full h-10 pl-10 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-eticket-400"
              >
                <option value="">Toutes dates</option>
                <option value="today">Aujourd'hui</option>
                <option value="tomorrow">Demain</option>
                <option value="this-week">Cette semaine</option>
                <option value="this-weekend">Ce weekend</option>
                <option value="next-week">Semaine prochaine</option>
                <option value="this-month">Ce mois</option>
              </select>
            </div>
            
            {/* Location filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                name="location"
                value={filters.location}
                onChange={handleInputChange}
                placeholder="Lieu"
                className="pl-10"
              />
            </div>

            {/* Reset Filters */}
            <Button 
              type="button"
              variant="ghost"
              onClick={resetFilters}
              className="text-eticket-400 hover:text-eticket-500"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
