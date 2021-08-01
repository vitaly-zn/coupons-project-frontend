import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CouponModel, { Category } from "../../../Models/CouponModel";
import { companyCouponAddedAction } from "../../../Redux/CompanyAppState";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notifications";
import "./AddCoupon.css";

function AddCoupon(): JSX.Element {
    const currCompanyId = store.getState().authAppState.user.id;
    const { register, handleSubmit, formState: { errors } } = useForm<CouponModel>();
    const [category, setCategory] = useState<Category>("" as unknown as Category);
    const history = useHistory();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategory(event.target.value as Category);
    };

    async function onSubmit(coupon: CouponModel) {
        try {
            if (coupon.startDate > coupon.endDate) {
                notify.error("Start date must be before expiration date!")
            } else {
                coupon.companyId = currCompanyId;
                coupon.image = coupon.imageFile.item(0).name;

                // =======  - multipart from-data - ==========//
                // const myFormData = new FormData();
                // myFormData.append("companyId", coupon.companyId.toString());
                // myFormData.append("category", coupon.category);
                // myFormData.append("title", coupon.title);
                // myFormData.append("description", coupon.description);
                // myFormData.append("startDate", coupon.startDate);
                // myFormData.append("endDate", coupon.endDate);
                // myFormData.append("amount", coupon.amount.toString());
                // myFormData.append("price", coupon.price.toString());
                // myFormData.append("image", coupon.image);
                // myFormData.append("imageFile", coupon.imageFile.item(0));
                // =======  - multipart from-data - ==========//

                const response = await jwtAxios.post<CouponModel>(globalConfigs.urls.company + currCompanyId + "/add/coupon", coupon);
                const addedCoupon = response.data;
                store.dispatch(companyCouponAddedAction(addedCoupon));
                notify.success("Coupon " + addedCoupon.title + " added");
                history.goBack();
            }
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="AddCoupon">
            <Typography variant="h4">Add Coupon</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <TextField {...register("title", {
                        required: { value: true, message: "Missing title" }
                    })}
                        label="Title"
                        type="text"
                        placeholder="Enter title"
                        required
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                </FormControl>
                <br />
                <FormControl>
                    <InputLabel required shrink>Description</InputLabel>
                    <TextareaAutosize {...register("description", {
                        required: { value: true, message: "Missing description" },
                        minLength: { value: 4, message: "Description must be al least 4 characters" },
                        maxLength: { value: 200, message: "Description must be at most 200 characters" }
                    })}
                        minRows={3}
                        maxRows={3}
                        aria-label="maximum height"
                        placeholder="Enter description"
                        required
                    />
                    <span style={{ color: "red" }}>{errors.description?.message}</span>
                </FormControl>
                <br />
                <FormControl>
                    <TextField {...register("amount", {
                        required: { value: true, message: "Missing amount" },
                        min: { value: 0, message: "Amount must be more or equals to 0" },
                        max: { value: 10000, message: "Amount must be less or equals to 10_000" }
                    })}
                        label="Amount"
                        type="number"
                        placeholder="Enter amount"
                        required
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                    />
                </FormControl>
                <br />
                <FormControl>
                    <TextField {...register("price", {
                        required: { value: true, message: "Missing price" },
                        min: { value: 0, message: "Price must be more ore equals to 0" },
                        max: { value: 1000000, message: "Price must be less or equals to 1_000_000.00" }
                    })}
                        label="Price"
                        type="decimal"
                        placeholder="Enter price"
                        required
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />
                </FormControl>
                <br />
                <FormControl>
                    <TextField {...register("startDate", {
                        required: { value: true, message: "Missing start date" },
                        min: { value: new Date().toLocaleDateString(), message: "Start date must be from today only" },
                    })}
                        label="Start Date"
                        type="date"
                        required
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.startDate}
                        helperText={errors.startDate?.message}
                    />
                </FormControl>
                <br />
                <FormControl>
                    <TextField {...register("endDate", {
                        required: { value: true, message: "Missing expiration date" },
                        min: { value: new Date().toLocaleDateString(), message: "Expiration date must be from today only" },
                    })}
                        label="Expiration Date"
                        type="date"
                        required
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.endDate}
                        helperText={errors.endDate?.message}
                    />
                </FormControl>
                <br />
                <FormControl>
                    <InputLabel required shrink>Category</InputLabel>
                    <Select {...register("category", { required: true })}
                        value={category}
                        displayEmpty
                        error={!!errors.category}
                        onChange={handleChange}
                    >
                        <MenuItem selected disabled value="">
                            <em>Select Category</em>
                        </MenuItem>
                        <MenuItem value={Category.CLOTHING}>Clothing</MenuItem>
                        <MenuItem value={Category.EDUCATION}>Education</MenuItem>
                        <MenuItem value={Category.ELECTRICITY}>Electricity</MenuItem>
                        <MenuItem value={Category.HEALTHY}>Healthy</MenuItem>
                        <MenuItem value={Category.RESTAURANT}>Restaurant</MenuItem>
                        <MenuItem value={Category.SPORT}>Sport</MenuItem>
                        <MenuItem value={Category.VACATION}>Vacation</MenuItem>
                    </Select>
                    <FormHelperText>Select Coupon Category</FormHelperText>
                </FormControl>
                <br />
                <FormControl>
                    <InputLabel required shrink>Image</InputLabel><br />
                    <input {...register("imageFile", {
                        required: { value: true, message: "Missing image" }
                    })}
                        type="file"
                        required
                        accept="image/*"
                    />
                    <span style={{ color: "red" }}>{errors.imageFile?.message}</span>
                </FormControl>

                <br /><br />
                <div>
                    <Button type="submit" color="primary" variant="contained">Add</Button>
                    <Button onClick={history.goBack} color="secondary" variant="contained" startIcon={<ArrowBack />}>Cancel</Button>
                </div>

            </form>
        </div>
    );
}

export default AddCoupon;
