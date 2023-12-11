import { icon_1, icon_2, icon_3, icon_4, icon_5, icon_6, icon_7, icon_8 } from "../../assets/minesweeper";

const TileAroundIcon = ({ value }) => {
    const getIconForValue = (value) => {
        switch (value) {
            case 1:
                return icon_1;
            case 2:
                return icon_2;
            case 3:
                return icon_3;
            case 4:
                return icon_4;
            case 5:
                return icon_5;
            case 6:
                return icon_6;
            case 7:
                return icon_7;
            case 8:
                return icon_8;
            case "flag":
                return icon_flag;
            case "bomb":
                return icon_bomb;
            case 0:
                return "";
        }
    };

    return <>{value != 0 && <img src={getIconForValue(value)} alt="Number" />}</>;
};

export default TileAroundIcon;
