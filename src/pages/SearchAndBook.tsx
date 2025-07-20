import { useForm, Controller } from 'react-hook-form';
import FormInput from '../components/FormInput';
import DatePickerField from '../components/DatePickerField';
import Spinner from '../components/Spinner';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface SearchData {
  capacityRequired: number;
  fromPincode: string;
  toPincode: string;
  startTime: Date;
}

export default function SearchAndBook() {
  const { register, control, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<SearchData>({
    defaultValues: { startTime: new Date() }
  });

  const [results, setResults] = useState<any[]>([]);
  const [duration, setDuration] = useState<number | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const onSearch = async (data: SearchData) => {
    try {
      const res = await api.get('/vehicles/available', {
        params: { ...data, startTime: data.startTime.toISOString() }
      });
      setResults(res.data.vehicles);
      setDuration(res.data.estimatedRideDurationHours);
    } catch {
      toast.error('Error fetching vehicles');
    }
  };

  const bookVehicle = async (id: string) => {
    setBookingId(id);
    try {
      await api.post('/bookings', {
        vehicleId: id,
        fromPincode: watch('fromPincode'),
        toPincode: watch('toPincode'),
        startTime: watch('startTime').toISOString(),
        customerId: 'demo-user-1',
      });
      toast.success('Booking successful!');
      handleSubmit(onSearch)();
    } catch (err: any) {
      toast.error(err.response?.status === 409 ? 'Vehicle unavailable.' : 'Booking failed');
    } finally {
      setBookingId(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Search & Book</h2>

      <form onSubmit={handleSubmit(onSearch)} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <FormInput
          label="Capacity Required"
          type="number"
          {...register('capacityRequired', { required: 'Required', min: 1 })}
          error={errors.capacityRequired}
        />
        <FormInput
          label="From Pincode"
          {...register('fromPincode', { required: 'Required' })}
          error={errors.fromPincode}
        />
        <FormInput
          label="To Pincode"
          {...register('toPincode', { required: 'Required' })}
          error={errors.toPincode}
        />
        <div>
          <label className="block text-sm font-medium text-gray-600">Pickup Time</label>
          <Controller
            control={control}
            name="startTime"
            render={({ field }) => <DatePickerField {...field} />}
          />
          {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`sm:col-span-2 flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition
                      ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {isSubmitting ? <Spinner /> : 'Search'}
        </button>
      </form>

      {duration !== null && (
        <div className="mb-6">
          {results.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Available Vehicles ({duration} hrs)</h3>
              {results.map(v => (
                <div key={v.id} className="p-5 border rounded-xl shadow flex justify-between items-center bg-gray-50">
                  <div>
                    <p className="text-lg font-bold">{v.name}</p>
                    <p className="text-sm text-gray-600">Capacity: {v.capacityKg} kg</p>
                    <p className="text-sm text-gray-600">Tyres: {v.tyres}</p>
                  </div>
                  <button
                    onClick={() => bookVehicle(v.id)}
                    disabled={bookingId === v.id}
                    className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition
                                ${bookingId === v.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {bookingId === v.id ? 'Booking...' : 'Book Now'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg font-medium">
              No vehicles available for the selected criteria.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
