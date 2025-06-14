'use client'
import React, { useState } from 'react'
import useFileStore from '@/zustand/useFileStore'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()

    const { setCurrentFile } = useFileStore()
    const [loading, setLoading] = useState(false);

    const [step, setStep] = useState<number>(1)

    const [genre, setGenre] = useState<string>('')
    const [tone, setTone] = useState<string>('')
    const [count, setCount] = useState<string>('')
    const [imgStyle, setImgStyle] = useState<string>('')


    const addStep = () => {
        if (step === 1 && !genre) {
            alert("Please select a genre.");
            return;
        }
        if (step === 2 && !tone) {
            alert("Please select a tone.");
            return;
        }
        if (step === 3 && !count) {
            alert("Please select a scene count.");
            return;
        }
        setStep(step + 1);
    }
    const backStep = () => {
        console.log(step)
        { step < 1 ? setStep(3) : setStep(step - 1) }
    }

    const handleSubmit = () => {

        const fetchApi = async () => {
            setLoading(true);

            try {
                let res = await fetch('/api/gen-script', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        tone,
                        genre,
                        sceneCount: count,
                        imageStyle: imgStyle
                    })
                });

                const data = await res.json();
                console.log(data);
                setCurrentFile(data);

                setStep(1)
                setGenre('')
                setTone('')
                setCount('')
                setImgStyle('')
                router.push('/dashboard')
            } catch (err) {
                console.error("Fetch failed:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchApi();

    };


    const imgStyles = [
        { title: 'Studio Ghibli', img: '/assets/imgstyle/1.png' },
        { title: 'Cyberpunk', img: '/assets/imgstyle/2.png' },
        { title: 'Minimalist', img: '/assets/imgstyle/3.png' },
        { title: 'Watercolor illustration', img: '/assets/imgstyle/4.png' },
        { title: 'Digital painting', img: '/assets/imgstyle/5.png' },
        { title: '3D rendered', img: '/assets/imgstyle/6.png' },
        { title: 'Pixel art', img: '/assets/imgstyle/7.png' },
        { title: 'Gta 5', img: '/assets/imgstyle/8.png' },
        { title: 'Photorealistic', img: '/assets/imgstyle/9.png' },

    ];

    const handleSelectStyle = (style: string) => {
        setImgStyle(style);
    };


    return (


        <div className='w-full relative py-[150px] text-[#323232]'>
            <div
                className="w-full text-[70px] text-center leading-[1] bg-gradient-to-r from-[#4F80FF] to-[#B86EFF] text-transparent bg-clip-text"
            >
                Create New
            </div>

            <div className='my-[50px]'>
                <div className=' flex flex-col py-[25px] w-screen left-1/2 -translate-x-1/2 relative'>


                    <ul className="steps">
                        {/* step-primary */}
                        <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>Genre</li>
                        <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>Tone</li>
                        <li className={`step ${step >= 3 ? 'step-primary' : ''}`}>Scene<br></br> Count</li>
                        <li className={`step ${step >= 4 ? 'step-primary' : ''}`}>Image<br></br> Style</li>

                    </ul>
                </div>

                <div className='w-full flex flex-col items-center justify-around'>
                    <div className='w-full text-center text-[40px]'>
                        {step === 1 && 'Genre'}
                        {step === 2 && 'Tone'}
                        {step === 3 && 'Scene Count'}
                        {step === 4 && 'Image Style'}
                    </div>

                    {step === 1 && (
                        <div className='w-full flex items-center justify-center py-[25px]'>
                            <select
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                className="select select-primary bg-white rounded-full cursor-pointer"
                                required
                            >
                                <option disabled value="">Select Genre</option>
                                <option>Sci-fi</option>
                                <option>Fantasy</option>
                                <option>Romance</option>
                                <option>Horror</option>
                                <option>Mystery</option>
                                <option>Comedy</option>
                                <option>Action</option>
                                <option>Slice of Life</option>
                                <option>Historical</option>
                                <option>Adventure</option>
                            </select>
                        </div>
                    )}

                    {step === 2 && (
                        <div className='w-full flex items-center justify-center py-[25px]'>
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="select select-primary bg-white rounded-full cursor-pointer"
                            >
                                <option disabled value="">Select Tone</option>
                                <option>Inspirational</option>
                                <option>Dark and eerie</option>
                                <option>Funny and lighthearted</option>
                                <option>Romantic</option>
                                <option>Serious and dramatic</option>
                                <option>Whimsical / magical</option>
                                <option>Suspenseful</option>
                                <option>Bittersweet</option>
                            </select>
                        </div>
                    )}

                    {step === 3 && (
                        <div className='w-full flex items-center justify-center py-[25px]'>
                            <select
                                value={count}
                                onChange={(e) => setCount(e.target.value)}
                                className="select select-primary bg-white rounded-full cursor-pointer"
                            >
                                <option disabled value="">Select Scene Count</option>
                                <option>3</option>
                                <option>5</option>
                                <option>7</option>
                            </select>
                        </div>
                    )}

                    {step === 4 && (
                        <div className='w-full py-[25px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-[5px]'>
                            {imgStyles.map((style) => (
                                <div
                                    key={style.title}
                                    onClick={() => handleSelectStyle(style.title)}
                                    className={`aspect-[1/1.3] relative flex-shrink-0 w-full rounded-lg overflow-hidden cursor-pointer border-4 ${imgStyle === style.title ? 'border-violet-500' : 'border-transparent'
                                        }`}
                                >
                                    <div className="w-full h-full bg-blue-500">
                                        <img className="w-full h-full object-cover" src={style.img} alt={style.title} />
                                    </div>

                                    {/* Title on top of image */}
                                    <div className="absolute bottom-0 w-full h-[20%] bg-[#323232] flex items-center justify-center text-white text-center px-1 z-[50]">
                                        {style.title}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {loading && (
                        <div>Your video is ready.</div>
                    )}


                    <div className='w-full flex items-center justify-center gap-[25px]'>
                        {(step != 1) &&
                            <div className='px-[80px] py-[30px] bg-[#7F81FF] text-white rounded-full cursor-pointer' onClick={() => backStep()}>
                                Prev
                            </div>
                        }
                        {step !== 4 &&
                            <div className='px-[80px] py-[30px] bg-[#7F81FF] text-white rounded-full cursor-pointer' onClick={() => addStep()}>
                                Next
                            </div>
                        }

                        {step === 4 &&
                            <div className='px-[80px] py-[30px] bg-[#7F81FF] text-white rounded-full cursor-pointer' onClick={() => handleSubmit()}>
                                Done
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div >
    )
}

export default page