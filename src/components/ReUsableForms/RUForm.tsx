import { FieldValues, FormProvider, Resolver, SubmitHandler, useForm } from "react-hook-form";
type TFormConfig<T extends FieldValues> = {
  resolver?: Resolver<T >
}
type TFromProps<T extends FieldValues> = {
    children : React.ReactNode;
    onSubmit : SubmitHandler<FieldValues>;
} & TFormConfig<T>;

const RUForm = <T extends FieldValues>({children, onSubmit, resolver}: TFromProps<T>) => {
  const formConfig: TFormConfig<T> = {};
  if(resolver){
    formConfig["resolver"] = resolver
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