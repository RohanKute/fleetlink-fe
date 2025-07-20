import { useForm } from 'react-hook-form';
import FormInput from '../components/FormInput';
import Spinner from '../components/Spinner';
import api from '../api/axios';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  capacityKg: number;
  tyres: number;
}

export default function AddVehicle() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      console.log("data", data);

      const res = await api.post('/vehicles', data);
      
      toast.success(`Vehicle "${res.data.name}" added!`);
      reset();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to add vehicle');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add New Vehicle</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormInput
          label="Vehicle Name"
          placeholder="e.g. Tata Ace"
          {...register('name', { required: 'Name is required' })}
          error={errors.name}
        />
        <FormInput
          label="Capacity (KG)"
          type="number"
          placeholder="e.g. 1000"
          {...register('capacityKg', {
            required: 'Capacity is required',
            min: { value: 1, message: 'Must be at least 1kg' },
                        valueAsNumber : true
          })}
          error={errors.capacityKg}
        />
        <FormInput
          label="Tyres"
          type="number"
          placeholder="e.g. 4"
          {...register('tyres', {
            required: 'Tyre count required',
            min: { value: 1, message: 'At least one tyre' },
            valueAsNumber : true
          })}
          error={errors.tyres}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition"
        >
          {isSubmitting ? <Spinner /> : 'Add Vehicle'}
        </button>
      </form>
    </div>
  );
}