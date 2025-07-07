<template>
  <div class="w-80% max-w-200 mx-auto mb-20 text-white">
    <breadcrumbComps
      class="mt-30"
      :items="[
        { label: '首頁', to: '/' },
        { label: '服務條款'},
      ]"
    />
    <typography variant="h2" font-type="title" underline class="mb-8 mt-2 text-white"
      >服務條款
    </typography>
    <div class="p-4 line-height-8">
      <p>本服務條款（以下稱「本條款」）適用於「Butter & Sugar」網站（以下稱「Butter & Sugar」、「我們」或「我們的」）。</p>
      <typography variant="h4" font-type="title" underline class="mb-4 mt-5 text-white"
        >同意條款
      </typography>
      <p class="mb-4">Butter & Sugar 為提供錄製影片教學，或現場即時教學、直播活動之教學服務提供者，係跨地域及時間之教學平台。我們的產品和服務包括：所有平台上之課程、課程之相關教材以及對於使用者之即時資訊回饋（以下稱「本服務」）。</p>
      <p class="mb-4">不論個別使用者其物理位置於何處，本條款適用於所有連結至 Butter & Sugar  之會員或訪客（以下合稱「使用者」、「您」），當您於本教學平台（以下稱「本平台」）完成註冊及／或使用本平台服務，即表示您已閱讀、瞭解、同意接受並遵守本條款。</p>
      <p>Butter & Sugar  在法律允許的範圍內，有權隨時修改、調整本條款中的任何條款內容，使用者必須定期造訪本平台，以確保了解 Butter & Sugar 最新之相關使用條款。若您不同意本條款之部分或全部內容，您應立即停止使用本服務。</p>
      
      <typography variant="h4" font-type="title" underline class="mb-4 mt-5 text-white"
        >註冊義務聲明
      </typography>
      <p class="mb-4">使用者應為完全行為能力人，如您為限制行為能力人或無行為能力人者，當您申請註冊成為會員，並繼續使用本平台服務時，則表示您的法定代理人、監護人或輔助人，已經閱讀並同意本條款。</p>
      <p class="mb-4">使用者應定期更新其個人資料，並保證其為真實、正確和最新的資料。</p>
      <p class="mb-4">使用者不應使用不實、不完整的資料，或與其個人真實資料無關之資訊，建立其帳號名稱，包括但不限於使用模仿他人姓名、使用攻擊性的字眼、任何種族歧視的文字，或任何會傷害、侵害他人權利之文字作為帳號名稱。</p>
      <p class="mb-4">若使用者違反上述條款，Butter & Sugar 有權隨時暫停或終止使用者帳號，並拒絕使用者使用本服務。</p>
      <p class="mb-4">使用者有義務妥善保管帳戶、密碼及其他相關身分驗證資訊，並為此帳號登入系統後所進行之一切活動、行為負責，包括但不限於衍生之相關費用。</p>
      <p class="mb-4">本服務僅供使用者本人使用，使用者不得將其帳號及密碼轉讓或出借給他人使用，如發現其帳號遭他人非法使用，或因駭客行為或會員的保管疏忽導致帳號、密碼遭他人非法使用，使用者應立即通知 ShiFu｜大師課業股份有限公司，但本平台對此不負擔任何賠償責任。</p>
      <p class="mb-4">如果您與他人共用電腦或使用公共電腦，請務必關閉瀏覽器或清除瀏覽器資料，以防他人取得您的帳號資料。</p>

      <typography variant="h4" font-type="title" underline class="mb-4 mt-5 text-white"
        >使用者守法承諾
      </typography>
      <p class="mb-4">您同意並承諾，不會以任何非法的目的或方式使用本服務，並且將遵守中華民國相關法規和所有使用網際網路的國際慣例。如果您是位於中華民國以外的使用者，您同意遵守所屬國家或地區的法律。</p>
      <p class="mb-4">使用者同意並承諾，不會利用本服務從事侵害他人權益或違法行為，包括但不限於以下情況：</p>
      <ul class="list-ul mb-6">
        <li>上載、張貼、公布或傳送任何誹謗、侮辱、具威脅性、攻擊性、不雅、猥褻、不實、違反公共秩序或善良風俗或其他不法之文字、圖片或任何形式的檔案於本服務上。</li>
        <li>侵害他人名譽、隱私權、營業秘密、商標權、著作權、專利權、其他智慧財產權及其他權利。</li>
        <li>違反依法律或契約所應負之保密義務。</li>
        <li>冒用他人名義使用本服務，或使他人用自己名義使用本服務。</li>
        <li>上載、傳輸或散佈任何含有電腦病毒或對電腦軟硬體產生中斷、破壞或限制功能之程式碼資料。</li>
        <li>從事不法交易行為或張貼虛假不實、引人犯罪之訊息。</li>
        <li>濫發廣告郵件、垃圾郵件、連鎖信，色情或賭博等各種違法訊息。</li>
        <li>以任何方式傷害未成年人。</li>
        <li>偽造訊息來源或以任何方式干擾傳輸來源之認定。</li>
        <li>干擾或中斷本服務或伺服器或連結本服務之網路，或不遵守連結至本服務之相關需求、程序、政策或規則等。</li>
        <li>追蹤他人或其他干擾他人或蒐集或儲存他人之個人資訊。</li>
        <li>其他 Butter & Sugar 認為不適當之行為。</li>
      </ul> 
      <p>當使用者違反上述規定，Butter & Sugar 有權隨時暫停或終止使用者帳號，並拒絕使用者使用本服務。</p>

      <typography variant="h4" font-type="title" underline class="mb-4 mt-5 text-white"
        >內容所有權與智慧財產權
      </typography>
      <p class="mb-4">本平台上所有內容和材料，包括但不限於文字、聲音、圖片、影片、圖表、軟體、網頁設計、網站架構、網站畫面安排，均受智慧財產權法律保護，由 Butter & Sugar 或其他權利人（如合作講師）依法擁有其所有權，包括但不限於著作權、商標權、專利權等。</p>
      <p class="mb-4">非經 Butter & Sugar 同意或其他權利人事前書面同意，使用者不得擅自以各種形式，包含但不限於下載、修改、重製、錄音、錄影、傳播、散佈、使用、公開口述、公開播送、公開發表、公開上映、公開演出、公開傳輸、公開展示、發行、出售、再授權或轉讓全部、部分 Butter & Sugar 及 Butter & Sugar 上任何相關課程、講義內容；</p>
      <p class="mb-4">使用者亦不得進行任何功能或程式的逆向工程、反向組譯、拆解、重組、解編或複製，或企圖取得原始碼或內容。</p>
      <p class="mb-4">如使用者違反上述規定，Butter & Sugar 有權隨時暫停或終止使用者帳號，並拒絕使用者使用本服務。使用者也需承擔因此而造成的所有侵權行為，所引起的賠償和法律責任（包括但不限於律師費用及所失利益）。</p>

      <typography variant="h4" font-type="title" underline class="mb-4 mt-5 text-white"
        >退費說明
      </typography>
      <ul class="list-decimal">
        <li>退款資格：使用者若在購買後７日內，經確認未曾觀看正式課程影片、下載內容檔案（不包含試閱單元），皆可申請辦理退費。</li>
        <li>退款流程：請提供您購買時，填寫的姓名及電子信箱，並註明欲退費原因，來信至 support@bns.tw，會有專人審核後受理退費。</li>
        <li>退款方式
          <ul class="list-ul">
            <li>信用卡刷退：如果當初購買時，採用信用卡付費，則採信用卡退刷方式。</li>
            <li>匯款退款：如果當初購買時採用 ATM 轉帳或超商付款，則採匯款退款方式。</li>
          </ul>
        </li>
      </ul>

      <typography variant="h4" font-type="title" underline class="mb-4 mt-5 text-white"
        >免責聲明
      </typography>
      <p class="mb-4">使用者應對自己使用本服務時之言行負責，並應自行判斷其他使用者提供之資訊及言論真偽。</p>
      <p class="mb-4">本服務可能含有連結至第三方網站，由於我們無法控制第三方網站內容及資源，因此您在進入、使用任何網站前，需自行瞭解該網站之使用者條款及隱私權政策，並謹慎斟酌判斷其可信度和正確性。</p>
      <p class="mb-4">使用者在使用本服務時，若因為使用者自身疏失、違法行為或其他原因所造成的損失，Butter & Sugar 概不負責。</p>
      <p class="mb-4">本免責聲明如有任何未盡事宜，均以相關法律法規及本平台相關規定為準。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import breadcrumbComps from '@/components/layout/breadcrumbComps.vue';
import typography from '@/components/layout/typography.vue';

</script>

<style scoped>
.list-ul li, .list-decimal ul li{
  list-style: disc;
  margin-left: 1.5rem;
}
.list-decimal li{
  list-style: decimal;
  margin-left: 1.5rem;
}
</style>
