import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FilterListIcon from '@mui/icons-material/FilterList';

import "./Filter.css"
import { useSearchParams } from "react-router-dom";


export default function Filter(genre) {
    
    const [open, setOpen] = useState(false);
    const [checkedGenres, setCheckedGenres] = useState([]);
    const [movieDetails, setMovieDetails] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const genrelist = searchParams.get("genre")?.split("-").map((id => Number(id)))
        if(genrelist){
            setCheckedGenres(genrelist)
        }
    },[])

    const handleGenreChange = (genreId) => {

        if (checkedGenres.includes(genreId)) {
            setCheckedGenres(checkedGenres.filter(id => id !== genreId));
        } else {
            setCheckedGenres([...checkedGenres, genreId]);
        }

    };

    const handleReset = () => {
        setCheckedGenres([]);
    };

    const handleClear = () => {
        const params = new URLSearchParams();
        params.set('page', '1');
        setSearchParams(params.toString());
        setCheckedGenres([]);
    };

    const handleConfirm = () => {
        const params = new URLSearchParams();

        if (checkedGenres.length > 0) {
            params.set('page', searchParams.get("page"));
            params.set('genre', checkedGenres.join("-"));
        } else {
            params.set('page', searchParams.get("page"));
        }
        setSearchParams(params.toString());
        handleClose();
        
    }


    return (
        <div className='filter-div'>
            <h1>{genre.name}</h1>
            <div style={{display:"flex" , gap:"1rem"}}>
                {checkedGenres.length > 0 || searchParams.get('genre') ? (
                    <Button onClick={handleClear}>Clear</Button>
                ) : (
                    <></>
                )}

                <Button variant="outlined" onClick={handleClickOpen} sx={{
                    border: "1px solid black",
                    color:"black"
                }}>
                    <FilterListIcon />Filter
                </Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    marginTop:"70px"
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Filter"}
                </DialogTitle>
                <DialogContent sx={{
                    maxWidth: "500px",
                }}>
                    <DialogContentText id="alert-dialog-description">
                        <h1>Genres</h1>
                        <div className='genre-btns-div'>
                            {genre.data?.genres?.map((item) => (
                                <div key={item.id} className='select-item'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className='genre-btn'
                                            checked={
                                                checkedGenres.includes(item.id)
                                            }
                                            onChange={() => handleGenreChange(item.id)}
                                        />
                                        <span>{item.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleReset}>Reset</Button>
                    <Button onClick={handleConfirm} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}