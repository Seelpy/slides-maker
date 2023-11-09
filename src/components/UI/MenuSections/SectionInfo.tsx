import { useRef } from 'react';
import MenuSection from '../MenuSection'
import Button from '../Button'

type SectionInfoProps = {
    name: string,
    onPresentationNameChange(event: React.ChangeEvent<HTMLInputElement>): void,
    onImportJson(file: File): void,
    onExportJson(name: string): void,
};

const SectionInfo = (props: SectionInfoProps) => {
    const importJsonFile = useRef<HTMLInputElement | null>(null);

    return (
        <MenuSection name='Info'>
            <div>
                <input value={props.name} onChange={(e) => props.onPresentationNameChange(e)}/>
            </div>
            <div>
                <Button width='5.4rem' onClick={() => props.onExportJson(props.name)}>
                    Export json
                </Button>
                <Button width='5.4rem' onClick={() => importJsonFile.current?.click()}>
                    Import json
                </Button>
                <input type='file' id='importJsonFile' ref={importJsonFile} style={{display: 'none'}} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const files = event.currentTarget.files;
                        if (files && files.length > 0) props.onImportJson(files[0]);
                    }}
                />
            </div>
        </MenuSection>
    )
}

export default SectionInfo