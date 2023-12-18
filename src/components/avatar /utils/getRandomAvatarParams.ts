import {AvatarProps} from "@bigheads/core";

type AccessoryType = 'none' | 'roundGlasses' | 'tinyGlasses' | 'shades';
type BodyType = 'chest' | 'breasts';
type CircleColorType = 'blue';
type ClothingType = 'naked' | 'shirt' | 'dressShirt' | 'vneck' | 'tankTop' | 'dress';
type ClothingColor = 'white' | 'blue' | 'black' | 'green' | 'red';
type EyebrowsType = 'raised' | 'leftLowered' | 'serious' | 'angry' | 'concerned';
type EyesType =
    'normal'
    | 'leftTwitch'
    | 'happy'
    | 'content'
    | 'squint'
    | 'simple'
    | 'dizzy'
    | 'wink'
    | 'heart';
type FacialHairType = 'none' | 'none2' | 'none3' | 'stubble' | 'mediumBeard';
type GraphicType = 'none' | 'redwood' | 'gatsby' | 'vue' | 'react' | 'graphQL';
type HairType = 'none' | 'long' | 'bun' | 'short' | 'pixie' | 'balding' | 'buzz' | 'afro' | 'bob';
type HairColorType = 'blonde' | 'orange' | 'black' | 'white' | 'brown' | 'blue' | 'pink';
type HatType = 'none' | 'none2' | 'none3' | 'none4' | 'none5' | 'beanie' | 'turban';
type HatColorType = 'white' | 'blue' | 'black' | 'green' | 'red';
type LashesType = boolean;
type LipColorType = 'red' | 'purple' | 'pink' | 'turqoise' | 'green';
type MaskType = boolean;
type FaceMaskType = boolean;
type MouthType = 'grin' | 'sad' | 'openSmile' | 'lips' | 'open' | 'serious' | 'tongue';
type SkinToneType = 'light' | 'yellow' | 'brown' | 'dark' | 'red' | 'black';
type FaceMaskColorType = 'white' | 'blue' | 'black' | 'green' | 'red';


export const getRandomAvatarParams = (): AvatarProps => {
    const accessory: AccessoryType[] = ['none', 'roundGlasses', 'tinyGlasses', 'shades'];
    const body: BodyType[] = ['chest', 'breasts'];
    const circleColor: CircleColorType[] = ['blue'];
    // removes: 'naked'
    const clothing: ClothingType[] = ['shirt', 'dressShirt', 'vneck', 'tankTop', 'dress'];
    const clothingColor: ClothingColor[] = ['white', 'blue', 'black', 'green', 'red'];
    const eyebrows: EyebrowsType[] = ['raised', 'leftLowered', 'serious', 'angry', 'concerned'];
    const eyes: EyesType[] = ['normal', 'leftTwitch', 'happy', 'content', 'squint', 'simple', 'dizzy', 'wink', 'heart'];
    const facialHair: FacialHairType[] = ['none', 'none2', 'none3', 'stubble', 'mediumBeard'];
    const graphic: GraphicType[] = ['none', 'redwood', 'gatsby', 'vue', 'react', 'graphQL'];
    const hair: HairType[] = ['none', 'long', 'bun', 'short', 'pixie', 'balding', 'buzz', 'afro', 'bob'];
    const hairColor: HairColorType[] = ['blonde', 'orange', 'black', 'white', 'brown', 'blue', 'pink'];
    const hat: HatType[] = ['none', 'none2', 'none3', 'none4', 'none5', 'beanie', 'turban'];
    const hatColor: HatColorType[] = ['white', 'blue', 'black', 'green', 'red'];
    const lashes: LashesType[] = [true, false];
    const lipColor: LipColorType[] = ['red', 'purple', 'pink', 'turqoise', 'green'];
    const mask: MaskType[] = [true];
    const faceMask: FaceMaskType[] = [true, false];
    const mouth: MouthType[] = ['grin', 'sad', 'openSmile', 'lips', 'open', 'serious', 'tongue'];
    const skinTone: SkinToneType[] = ['light', 'yellow', 'brown', 'dark', 'red', 'black'];
    const faceMaskColor: FaceMaskColorType[] = ['white', 'blue', 'black', 'green', 'red'];

    const avatarProps = {
        accessory: accessory[Math.floor(Math.random() * accessory.length)],
        body: body[Math.floor(Math.random() * body.length)],
        circleColor: circleColor[Math.floor(Math.random() * circleColor.length)],
        clothing: clothing[Math.floor(Math.random() * clothing.length)],
        clothingColor: clothingColor[Math.floor(Math.random() * clothingColor.length)],
        eyebrows: eyebrows[Math.floor(Math.random() * eyebrows.length)],
        eyes: eyes[Math.floor(Math.random() * eyes.length)],
        facialHair: facialHair[Math.floor(Math.random() * facialHair.length)],
        graphic: graphic[Math.floor(Math.random() * graphic.length)],
        hair: hair[Math.floor(Math.random() * hair.length)],
        hairColor: hairColor[Math.floor(Math.random() * hairColor.length)],
        hat: hat[Math.floor(Math.random() * hat.length)],
        hatColor: hatColor[Math.floor(Math.random() * hatColor.length)],
        lashes: lashes[Math.floor(Math.random() * lashes.length)],
        lipColor: lipColor[Math.floor(Math.random() * lipColor.length)],
        mask: mask[Math.floor(Math.random() * mask.length)],
        faceMask: faceMask[Math.floor(Math.random() * faceMask.length)],
        mouth: mouth[Math.floor(Math.random() * mouth.length)],
        skinTone: skinTone[Math.floor(Math.random() * skinTone.length)],
        faceMaskColor: faceMaskColor[Math.floor(Math.random() * faceMaskColor.length)]
    }

    return JSON.parse(JSON.stringify(avatarProps))
};
