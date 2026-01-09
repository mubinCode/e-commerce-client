import { DefaultValues, FieldValues, FormProvider, Resolver, SubmitHandler, useForm } from "react-hook-form";
type TFormConfig<T extends FieldValues> = {
  resolver?: Resolver<T >
  defaultValues?: DefaultValues< T>;
}
type TFromProps<T extends FieldValues> = {
    children : React.ReactNode;
    onSubmit : SubmitHandler<FieldValues>;
} & TFormConfig<T>;

const RUForm = <T extends FieldValues>({children, onSubmit, resolver, defaultValues}: TFromProps<T>) => {
  const formConfig: TFormConfig<T> = {};
  if(resolver){
    formConfig["resolver"] = resolver
  }
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
    const methods = useForm(formConfig)
    const submit : SubmitHandler<FieldValues> = (data) => {
        onSubmit(data)
    }
    return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submit)}>
            {children}
          </form>
        </FormProvider>
      )
}

export default RUForm;