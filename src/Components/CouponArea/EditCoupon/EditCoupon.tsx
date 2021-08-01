import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import CouponModel, { Category } from "../../../Models/CouponModel";
import { companyCouponUpdatedAction } from "../../../Redux/CompanyAppState";
import store from "../../../Redux/Store";
import globalConfigs from "../../../Services/GlobalConfigs";
import jwtAxios from "../../../Services/jwtAxios";
import notify from "../../../Services/Notifications";
import "./EditCoupon.css";

function EditCoupon(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<CouponModel>();
    const [category, setCategory] = useState<Category>("" as unknown as Category);
    const location = useLocation();
    const history = useHistory();
    const selectedCoupon = store.getState().companyAppState.company.coupons.find(e => e.id === location.state);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategory(event.target.value as Category);
    };

    async function onSubmit(coupon: CouponModel) {
        try {
            if (coupon.startDate > coupon.endDate) {
                notify.error("Start date must be before expiration date!")
            } else {
                coupon.id = selectedCoupon.id;
                coupon.companyId = store.getState().authAppState.user.id;
                const response = await jwtAxios.put<CouponModel>(globalConfigs.urls.company + coupon.companyId + "/update/coupon", coupon);
                const updateCoupon = response.data;
                store.dispatch(companyCouponUpdatedAction(updateCoupon));
                notify.success("Coupon " + updateCoupon.title + " was updated");
                history.goBack();
            }
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="EditCoupon">
            <Typography variant="h4">Edit Coupon</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <TextField {...register("title", {
                        required: { value: true, message: "Missing title" }
                    })}
                        label="Title"
                        type="text"
                        placeholder={selectedCoupon.title}
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
                        placeholder={selectedCoupon.description}
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
                        placeholder={selectedCoupon.amount.toString()}
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
                        placeholder={selectedCoupon.price.toString()}
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
                        InputProps={{ placeholder: selectedCoupon.startDate }}
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
                        InputProps={{ placeholder: selectedCoupon.endDate }}
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
                        accept="image/*"
                        required
                    />
                    <span style={{ color: "red" }}>{errors.imageFile?.message}</span>
                </FormControl>

                <br /><br />
                <div>
                    <Button type="submit" color="primary" variant="contained">Update</Button>
                    <Button onClick={history.goBack} color="secondary" variant="contained" startIcon={<ArrowBack />}>Cancel</Button>
                </div>

            </form>
        </div>
    );
}

export default EditCoupon;
