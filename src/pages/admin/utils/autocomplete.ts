import { IDestination } from "../../../redux/features/tour/tourSlice.interface";
import getLoader from "./getLoader";

type UpdateData = (inputId: string, newData: Omit<IDestination, "input_id">) => void

class Autocomplete {
    private input_id: string;
    private autocomplete: google.maps.places.Autocomplete | null = null;
    private updateData: UpdateData

    constructor(input_id: string, updateData: UpdateData) {
        this.input_id = input_id;
        this.updateData = updateData;
        this.initialize();
    }

    private async initialize() {
        try {
            const loader = getLoader();
    
            await loader.importLibrary('places');

            this.initAutocomplete();
        } catch (error) {
            console.error('Error loading Google Maps:', error);
        }
    }

    private initAutocomplete() {
        const autocompleteInput = document.getElementById(this.input_id) as HTMLInputElement;
        if (!autocompleteInput) return;

        this.autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
            types: ['locality', 'country', 'continent', 'administrative_area_level_1'],
            fields: ['name', 'place_id', 'geometry']
        });

        this.autocomplete.addListener('place_changed', () => {
            if(!this.autocomplete) return;

            const place = this.autocomplete.getPlace();
            if (!place.geometry || !place.place_id || !place.name) {
                autocompleteInput.placeholder = 'Enter a place';
            } else {
                this.updateData(this.input_id, { name: place.name, place_id: place.place_id })
            }
        });
    }

    public removeAutocomplete() {
        if (this.autocomplete) {
            google.maps.event.clearInstanceListeners(this.autocomplete);
        }
    }
}

export default Autocomplete;