-- Create a function to handle new user insertion
CREATE OR REPLACE FUNCTION public.handleUserData()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
-- Insert user profile data into the profiles table
INSERT INTO "public"."UserData" (id, firstname, lastname, agreedterms, setpasswd, ischild, phone)
VALUES (NEW.id,
        NEW.raw_user_meta_data ->> 'firstName',
        NEW.raw_user_meta_data ->> 'lastName',
        (NEW.raw_user_meta_data ->> 'agreedTerms')::boolean,
        (NEW.raw_user_meta_data ->> 'setPasswd')::boolean,
        (NEW.raw_user_meta_data ->> 'isChild')::boolean,
        (NEW.raw_user_meta_data ->> 'phone')::INTEGER);

-- Return the new row
RETURN NEW;
END;
$$

-- Create a trigger to execute the function after user insertion
CREATE OR REPLACE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handleUserData()

CREATE Policy "individual_authorized_user_data_access"
    on "MedicalData" for select
    using (auth.uid() = "userId");